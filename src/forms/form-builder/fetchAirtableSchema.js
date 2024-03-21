export default function fetchAirtableSchema(apiKey, baseId, tableName) {
    return fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const table = data.tables.find(table => table.name === tableName);
        if (!table) {
            console.error('Table not found:', tableName);
            return [];
        }

        return table.fields.filter(field => {
            // Exclude fields with specific types
            const excludedTypes = ['createdTime', 'updatedTime', 'formula', 'multipleLookupValues', 'multipleRecordLinks'];
            return !excludedTypes.includes(field.type);
        });
    })
    .catch(error => {
        console.error('Error fetching Airtable schema:', error);
        return [];
    });
}
