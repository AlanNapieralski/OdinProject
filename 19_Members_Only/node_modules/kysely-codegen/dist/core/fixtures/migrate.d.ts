import { Kysely } from 'kysely';
import type { Dialect } from '../dialect';
import type { DB } from '../outputs/postgres.output';
export declare const addExtraColumn: (db: Kysely<DB>) => Promise<void>;
export declare const migrate: (dialect: Dialect, connectionString: string) => Promise<Kysely<DB>>;
