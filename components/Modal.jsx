export default function Modal({ visible, width, onClose, children }) {
	// React.useEffect(() => {
	//   document.body.classList.add("disableScroll");
	//   return () => {
	//     document.body.classList.remove("disableScroll");
	//   };
	// }, [props.visible]);
	if (visible)
		return (
			<>
				<div className="backdrop" onClick={onClose}>
					<div id="Modal" style={{ width: width }}>
						{children}
					</div>
				</div>
			</>
		);
	return null;
}
