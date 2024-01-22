import { forwardRef } from "react";
import CSelect, { ClassNamesConfig, Props, SelectInstance } from "react-select";
import Text from "../Text/Text";
import styles from "./Select.module.css";

export type SelectOption = {
	value: string;
	label: string;
};

type SelectProps = {
	label?: string;
} & Props<SelectOption, false>;

const classNames: ClassNamesConfig<SelectOption, false> = {
	control: (state) =>
		`${styles.control} ${state.isFocused ? ` ${styles.focused}` : ""}`,
	valueContainer: () => styles.valueContainer,
	input: () => styles.input,
	singleValue: () => styles.singleValue,
	indicatorSeparator: () => styles.separator,
	indicatorsContainer: () => styles.indicatorsContainer,
	option: (state) =>
		`${styles.option} ${state.isSelected ? ` ${styles.selected}` : ""}  ${
			state.isFocused ? ` ${styles.focused}` : ""
		}`,
	menu: () => styles.menu,
	menuList: () => styles.menuList,
};

const Select = forwardRef<SelectInstance<SelectOption, false>, SelectProps>(
	({ label, ...props }, ref) => {
		return (
			<div className={styles.selectWrapper}>
				{label && (
					<Text tag="span" size="m" color="label" weight="700">
						{label}
					</Text>
				)}
				<CSelect
					ref={ref}
					classNames={classNames}
					components={{
						DropdownIndicator: DownChevron,
					}}
					isSearchable={false}
					{...props}
				/>
			</div>
		);
	}
);

const DownChevron = () => (
	<svg
		width="10"
		height="7"
		xmlns="http://www.w3.org/2000/svg"
		className={styles.dropdownIcon}
	>
		<path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
	</svg>
);

export default Select;
