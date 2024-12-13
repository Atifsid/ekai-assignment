interface ButtonProps {
    icon: any;
    text: string;
    click: any;
    className?: string
}

export const Button = (props: ButtonProps) => {
    return (
        <button className={`bg-white text-primary rounded-md font-bold ${props.className}`} onClick={props.click}>
            <span className='flex items-center gap-2'>
                {props.icon}
                {props.text}
            </span>
        </button>
    )
}