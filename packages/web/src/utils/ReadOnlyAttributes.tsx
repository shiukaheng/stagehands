export default function ReadOnlyAttribute({ title, value }: { title: string, value: string | number }) {
    return (
        <tr>
            <th>{title}</th>
            <td>
                <button
                    className="text-center mb-2 h-6 w-32 "
                    id={"mic" + title}>
                    {value}
                </button>
            </td>
        </tr>
    )
}