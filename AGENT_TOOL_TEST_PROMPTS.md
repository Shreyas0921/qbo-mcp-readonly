# Agent Tool Test Prompts (50)

Use these as one-prompt-per-tool tests.

## Create Tools

1. Create a new expense account named `QA Agent Account 001` with account type `Expense`.
2. Create a bill payment for vendor `56` for amount `25.00` on today’s date.
3. Create a bill for vendor `56` with one line item: amount `12.34`, description `QA concrete test`, account `1`.
4. Create a customer named `QA Agent Customer 001` with email `qa.customer001@example.com`.
5. Create an employee named `QA Agent Employee 001`.
6. Create an estimate for customer `1` with one line item for `50.00`.
7. Create an invoice for customer `1` with one line item for `75.00`.
8. Create an item named `QA Agent Item 001` with unit price `9.99`.
9. Create a journal entry dated today with a balanced debit/credit of `10.00`.
10. Create a purchase for vendor `56` with one expense line for `20.00`.
11. Create a vendor named `QA Agent Vendor 001` with email `qa.vendor001@example.com`.

## Delete Tools

12. Delete bill payment with id `1` (or mark inactive if that’s how delete works).
13. Delete bill with id `1`.
14. Delete customer with id `1`.
15. Delete estimate with id `1`.
16. Delete journal entry with id `1`.
17. Delete purchase with id `1`.
18. Delete vendor with id `1`.

## Get/Read Tools

19. Get bill payment with id `1`.
20. Get bill with id `1`.
21. Get customer with id `1`.
22. Get employee with id `1`.
23. Get estimate with id `1`.
24. Get journal entry with id `1`.
25. Get purchase with id `1`.
26. Get vendor with id `1`.
27. Read invoice with id `1`.
28. Read item with id `1`.

## Search Tools

29. Search accounts where `Name` contains `QA Agent`, limit 5.
30. Search bill payments from the last 30 days, limit 5.
31. Search bills for vendor `56`, limit 5.
32. Search customers where display name contains `QA Agent`, limit 5.
33. Search employees with names containing `QA`, limit 5.
34. Search estimates for customer `1`, limit 5.
35. Search invoices for customer `1`, limit 5.
36. Search items where name contains `QA Agent`, limit 5.
37. Search journal entries from the last 30 days, limit 5.
38. Search purchases for vendor `56`, limit 5.
39. Search vendors where display name contains `QA Agent`, limit 5.

## Update Tools

40. Update account `1` to set `Description` to `Updated by QA agent`.
41. Update bill payment `1` to set `PrivateNote` to `Updated by QA agent`.
42. Update bill `1` to set `PrivateNote` to `Updated by QA agent`.
43. Update customer `1` to set `DisplayName` to `QA Agent Customer Updated`.
44. Update employee `1` to set `GivenName` to `QAUpdated`.
45. Update estimate `1` to set `PrivateNote` to `Updated by QA agent`.
46. Update invoice `1` to set `PrivateNote` to `Updated by QA agent`.
47. Update item `1` to set `Description` to `Updated by QA agent`.
48. Update journal entry `1` by setting `PrivateNote` to `Updated by QA agent`.
49. Update purchase `1` to set `PrivateNote` to `Updated by QA agent`.
50. Update vendor `1` to set `DisplayName` to `QA Agent Vendor Updated`.
