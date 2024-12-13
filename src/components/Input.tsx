interface InputProps {
    text: string;
    className?: string;
    placeholder: string
    onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPressHandler?: any
}

export const Input = (props: InputProps) => {
    return (
        <input
            type="text"
            className={props.className}
            placeholder={props.placeholder}
            value={props.text}
            onChange={(e) => props.onChangeText(e)}
            onKeyDown={(e) => props.onKeyPressHandler ? props.onKeyPressHandler(e) : undefined}
        />
    )
}