def two_sum_unsorted(nums, k):
    seen = {} 
    for i, n in enumerate(nums):
        if k - n in seen:
            return (seen[k - n], i)
        seen[n] = i


def two_sum_descending(nums, k):
    i, j = 0, len(nums) - 1
    while i < j:
        s = nums[i] + nums[j]
        if s == k:
            return (i, j)
        if s > k:
            i += 1  
        else:
            j -= 1 


if __name__ == "__main__":
    assert two_sum_unsorted([2, 7, 11, 15], 9) == (0, 1)
    assert two_sum_unsorted([3, 2, 4], 6) == (1, 2)
    assert two_sum_unsorted([3, 3], 6) == (0, 1)
    assert two_sum_unsorted([1, 5, 8, 3, 2], 11) == (2, 3)

    assert two_sum_descending([15, 11, 7, 2], 9) == (2, 3)
    assert two_sum_descending([10, 8, 5, 3, 2, 1], 10) == (1, 4)
    assert two_sum_descending([20, 14, 11, 8, 4, 1], 15) in [(1, 5), (2, 4)]
    assert two_sum_descending([9, 7, 4, 3, 1], 10) in [(0, 4), (1, 3)]
    print("all tests passed")