/**
 * REACT COMPONENTS BRUKER PASCAL CASE FOR KOMPONENT NAVN. PASCAL CASE EXAMPLE ( PascalCaseComponent )
 *
 * Stor forbokstav på komponent, alle ord etter har også storbokstav.
 * Denne komponenten ligger rett inne i components mappen fordi det er en stor komponent eller en komponent
 * som ikke er veldig gjenbrukbar ( har som regel bare et bruksområde, som denne headeren. )
 */

export default function Header() {
	return (
		<header>
			<h1>
				Header component example. Lives in the components folder since its not
				very reusable.
			</h1>
		</header>
	);
}
