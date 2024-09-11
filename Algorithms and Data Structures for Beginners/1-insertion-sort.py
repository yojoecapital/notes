def insertionSort(array):
    for i in range(1, len(array)):
        j = i 
        while j > 0 and array[j - 1] > array[j]:
            tmp = array[j - 1]
            array[j - 1] = array[j]
            array[j] = tmp
            j -= 1

array = [4,3,2,6,1]
print(array)
insertionSort(array)
print(array)
