import React from 'react';
import Select from 'react-select';

const CustomSelect = ({ onChange, options, value }) => {

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : ''
    }
    return (
        <div >
            <Select
                value={defaultValue(options, value)}
                onChange={value => onChange(value)}
                options={options}
                styles={{
                    control: (base) => ({
                        ...base,
                        width: '240px',
                        fontSize: '12px',
                        borderRadius: '50px',
                        borderColor: '#848884',

                    }),
                    option: (base) => ({
                        ...base,
                        fontSize: '13px',
                    }),
                }}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: '#ECFFDC',
                        primary: '#1CD155',
                    },
                })}
            />
        </div>
    )
}

export default CustomSelect;