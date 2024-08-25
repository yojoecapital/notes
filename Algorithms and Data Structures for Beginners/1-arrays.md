# Static Arrays

The size of the array can't change once declared.

## Reading from an array

```py
for i in range(len(arr)):
    print(arr[i])
```

## Deleting from an array

- to remove an element from a static array, we can do a **soft delete** by setting its value to `0`, `null`, or `-1`
- more importantly, we should decrease the the length by 1

```py
def removeAtEnd(arr, length):
    arr[length - 1] = 0
```

