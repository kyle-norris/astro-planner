<script>
	const preload = async () => {
		const resp = await fetch('http://localhost/starmaps/');
		const blob = await resp.blob();

		return new Promise(function (resolve) {
			let reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject('Error: ', error);
		});
	};
</script>

{#await preload()}
	Image is loading!
{:then base64}
	<img src={base64} alt="Alright Buddy!" />
{/await}
