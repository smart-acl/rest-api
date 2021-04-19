export const SELECT_RULE_BY_METHOD_PATH =
    'SELECT * FROM rules, jsonb_array_elements(rules) rules_elem WHERE "rules_elem"->>\'method\' ILIKE $1 AND "rules_elem"->>\'path\' = $2';
