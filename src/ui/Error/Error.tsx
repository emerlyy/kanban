import Text from "../Text/Text";
import Title from "../Title/Title";
import styles from "./Error.module.css";
type Props = {
	message: string;
};

const Error = ({ message }: Props) => {
	return (
		<div className={styles.error}>
			<Title tag="h2" color="red" size="xl">
				Something went wrong
			</Title>
			<Text color="gray" tag="strong" size="l">
				{message}
			</Text>
		</div>
	);
};

export default Error;
