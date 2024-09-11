# note that hi is inclusive
def partition(array, low, hi):
    # in this code, you can use any value as the partition as long as you swap to end
    # we'll just use the last value
    pivot = array[hi]

    # "back of the line"
    i = low - 1

    # put the lower values in the "back of the line"
    for j in range(low, hi):
        if array[j] < pivot:
            i += 1
            array[i], array[j] = array[j], array[i]

    # put the pivot in the middle
    array[i + 1], array[hi] = array[hi], array[i + 1]
    return i + 1

def quickSort(array, low, hi):
    if low < hi:
        partition_location = partition(array, low, hi)
        quickSort(array, low, partition_location - 1)    
        quickSort(array, partition_location + 1, hi)
    return array
            
array = [4,3,8,2,6,1]
print(array)
print(quickSort(array, 0, len(array) - 1))
