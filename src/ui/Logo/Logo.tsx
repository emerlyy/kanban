import LogoDark from "@/assets/logo-dark.svg";
import LogoLight from "@/assets/logo-light.svg";
type Props = {
	color?: "light" | "dark";
	className?: string;
};

const Logo = ({ color = "dark", className }: Props) => {
	return (
		<div className={className}>
			<img
				src={color == "dark" ? LogoDark : LogoLight}
				alt="kanban"
				width={152}
				height={25}
			/>
		</div>
	);
};

export default Logo;
