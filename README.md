\# SkillsForge Backend Assessment



\## Section 1: Two-Sum

File: `section1/two\_sum.py`



Run: `python section1/two\_sum.py` (prints `all tests passed`)



\- \*\*Unsorted:\*\* loop once, store seen numbers in a dict, check if `k - n` is already there. O(N) time, O(N) space.

\- \*\*Descending:\*\* two pointers, one at each end. Sum too big, move left pointer right. Sum too small, move right pointer left. O(N) time, O(1) space.

