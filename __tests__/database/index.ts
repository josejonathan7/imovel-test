import { getConnection } from 'typeorm'

export const connection = getConnection("tests");
