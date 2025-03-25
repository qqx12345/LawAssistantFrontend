interface DisplayMessageProps {
    messages: string;
}
const DisplayMessage = ({ messages }:DisplayMessageProps) => {
    return (
        <div>
            <p>{messages}</p>
        </div>
    )
}
export default DisplayMessage