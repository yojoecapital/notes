def mergeSort(array):
    # base case
    if len(array) <= 1:
        return array
        
    # split in 2 halves
    half = len(array) // 2
    a = array[0:half]
    b = array[half:len(array)]

    a = mergeSort(a)
    b = mergeSort(b)

    # merge
    return merge(a, b)
    
def merge(a, b):
    c = []
    ai = 0
    bi = 0
    while ai < len(a) and bi <= len(b):
        if a[ai] < b[bi]:
            c.append(a[ai])
            ai += 1
        else:
            c.append(b[bi])
            bi += 1
    while ai < len(a):
        c.append(a[ai])
        ai += 1
    while bi < len(b):
        c.append(b[bi])
        bi += 1
    return c

array = [1,3,7,3,0,2]
print(array)
print(mergeSort(array))
    
    
