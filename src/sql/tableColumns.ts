// Generated by sqltyper 0.2.3 from tableColumns.sql.
// Do not edit directly. Instead, edit tableColumns.sql and re-run sqltyper.

import { ClientBase } from '../pg'

export async function tableColumns(
  client: ClientBase,
  params: { schemaName: string; tableName: string }
): Promise<
  Array<{
    attnum: number
    attname: string
    atttypid: number
    attnotnull: boolean
  }>
> {
  const result = await client.query(
    `
SELECT attnum, attname, atttypid, attnotnull
FROM pg_catalog.pg_attribute attr
JOIN pg_catalog.pg_class cls on attr.attrelid = cls.oid
JOIN pg_catalog.pg_namespace nsp ON nsp.oid = cls.relnamespace
WHERE
    cls.relkind = 'r'
    AND nsp.nspname = $1
    AND cls.relname = $2
ORDER BY attnum
`,
    [params.schemaName, params.tableName]
  )
  return result.rows
}
