def binarySearch(array, target):
    left = 0
    right = len(array) - 1
    while left <= right:
        mid = (left + right) // 2
        if array[mid] == target:
            return mid
        elif array[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

target = 10
array = [1,2,3,4,5,6,7,8,9,10]
print(array)
print(binarySearch(array, target))
