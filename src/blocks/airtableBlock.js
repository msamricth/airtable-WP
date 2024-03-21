const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { useState } = wp.element;
const { withSelect } = wp.data;

registerBlockType('airtable-wp/dynamic-form-builder', {
    title: 'Dynamic Form Builder',
    icon: 'editor-table',
    category: 'widgets',
    edit({ fields }) {
        const [formData, setFormData] = useState({});

        const handleChange = (event) => {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            // Send formData to Airtable using your preferred method (e.g., fetch API)
            console.log('Form data submitted:', formData);
        };

        return (
            <Fragment>
                {/* Filter by type */}
                <label htmlFor="filter-by-type">Filter by Type:</label>
                <select id="filter-by-type">
                    <option value="all">All</option>
                    <option value="singleLineText">Text</option>
                    <option value="email">Email</option>
                    <option value="date">Date</option>
                    <option value="singleSelect">Select</option>
                    <option value="Checkbox">Checkbox</option>
                    <option value="multipleAttachments">File</option>
                    {/* Add other field types as options */}
                </select>

                {/* Search field */}
                <label htmlFor="search-field">Search Fields:</label>
                <input type="text" id="search-field" placeholder="Search..." />

                <div id="field-container">
                    {/* Render fields dynamically based on the fields prop */}
                </div>

                {/* Form builder container */}
                <div id="form-builder-container">
                    <form onSubmit={handleSubmit}>
                        {fields.map((field) => (
                            <Fragment key={field.name}>
                                <label htmlFor={field.name}>{field.name}</label>
                                <input
                                    type="text"
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={handleChange}
                                />
                            </Fragment>
                        ))}
                        <button type="submit">Submit</button>
                    </form>
                </div>

                {/* Code view container */}
                <div id="form-code-container">
                    <textarea id="form-code"></textarea>
                </div>
            </Fragment>
        );
    },

    save() {
        // Save function not needed for this example
        return null;
    },
});

// Retrieve Airtable fields using withSelect HOC
wp.data.withSelect((select) => {
    const { getEntityRecords } = select('core');
    return {
        fields: getEntityRecords('postType', 'airtable-field'), // Adjust postType and taxonomy as needed
    };
});
