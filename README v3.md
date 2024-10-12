# RAMDB v3

Main point is to create Database That Contains Itself (DBTCI) model
Which, means that all metadata about database itself should be accessible and through same interface as anything else stored in database.

## Default structure

1. sys_tables = table where every row represents a table in database
2. sys_columns = table where every row represents a column of some table in database
3. sys_enums = table where every row represents a kind of enum
4. sys_values = table where every row represents a values used at enums

## Default columns

1. sys_ents
    - _ent(ref:_ents)
    - id(string)
    - isMeta(boolean)
2. sys_types
    - _ent(ref:_ents)
    - id(string)
    - isMeta(boolean)
2. sys_cols
    - _ent(ref:_ents)
    - id(string)
    - isMeta(boolean)
    - ent(ref: sys_tables)
    - name(string)
    - type(ref:sys_values.datatypes)
    - isList(boolean)
    - readable(number) //0 hidden, 1 visible
    - writable(number) //0 readonly, 1 writable
    - required(number) //0 optional, 1 required
    - initial(_=>type)
    - fallback(_=>type)
    - decimal(number)
    - min(number)
    - max(number)