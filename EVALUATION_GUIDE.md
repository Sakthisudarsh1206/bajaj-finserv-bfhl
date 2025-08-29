# Critical Test Cases for Evaluators

## Test 1: Question Paper Example A
POST /bfhl
{
  "data": ["a","1","334","4","R", "$"]
}
Expected: sum="339", concat_string="Ra"

## Test 2: Question Paper Example B
POST /bfhl
{
  "data": ["2","a", "y", "4", "&", "-", "*", "5","92","b"]
}
Expected: sum="103", concat_string="ByA"

## Test 3: Question Paper Example C
POST /bfhl
{
  "data": ["A","ABcD","DOE"]
}
Expected: sum="0", concat_string="EoDdCbAa"

## Test 4: Edge Case - Empty Array
POST /bfhl
{
  "data": []
}
Expected: All arrays empty, sum="0", concat_string=""

## Test 5: Error Handling
POST /bfhl
{
  "data": "invalid"
}
Expected: is_success=false

## Test 6: Large Input
POST /bfhl
{
  "data": ["1","2","3","a","b","c","!","@","#"]
}
Expected: Proper categorization of all elements

## Evaluation Checklist:
- [ ] All responses have exactly 10 required fields
- [ ] Numbers returned as strings
- [ ] Status codes: 200 for success
- [ ] CORS headers present
- [ ] Public accessibility (no authentication)
- [ ] Response time < 5 seconds
