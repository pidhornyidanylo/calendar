"use client";
import { useEffect } from "react";

interface GenericResizeProps {
	size: number;
	setState: (value: boolean) => void;
	valueIf: boolean;
	valueElse?: boolean;
}

const GenericResize: React.FC<GenericResizeProps> = ({
	size,
	setState,
	valueIf,
	valueElse,
}) => {
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < size) {
				setState(valueIf);
			} else {
				setState(valueElse as boolean);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [size, setState]);

	return null;
};

export default GenericResize;
