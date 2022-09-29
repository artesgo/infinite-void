export function appendSearchParam(query: any, searchOptions: any, column: string) {
	if (searchOptions[column]) {
		return query.ilike(column, `%${searchOptions[column]}%`);
	}
	return query;
}

export function trimProps(object: any) {
	for (const key of Object.keys(object)) {
		if (object[key] === '') {
			delete object[key];
		}
	}
}
