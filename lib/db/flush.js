import { deleteAll, deleteOne } from "./database";

/**
 * Dette er en funksjon som er tenkt å kjøres via node i terminalen, man kan kjøre
 * 2 forskjellige delete operations, deleteAll for og fjerne all data fra tabellen eller
 * deleteOne for og fjerne enkelt elementer fra tabellen.
 *
 * For og bruke denne funksjonen naviger til riktig mappe i terminalen deretter kjør
 *
 * node flush.js <operation> <model> [id]
 *
 * <operation> - Vil være hvilken funksjon man vil kjøre, deleteAll eller deleteOne.
 * <model> - Dette er hvilken data tabell man skal slette fra, BrregApiData, WebCrawlerData.
 * [id] - Id er brukt i sammenheng med deleteOne fordi deleteOne bruker ID'en fra data tabellen for og finne hvilken man skal slette.
 * Man trenger ikke bruke id i node for og bruke deleteAll.
 */

async function main() {
	const args = process.argv.slice(2);

	const operation = args[0];
	const model = args[1];
	const id = args[2];

	if (!operation || !model) {
		console.error("Usage: node flush.js <operation> <model> [id]");
		process.exit(1);
	}

	try {
		console.log(
			`Running ${operation} on model "${model}" ${id ? `with ID ${id}` : ""}`
		);
		let result;

		switch (operation) {
			case "deleteAll":
				console.log(`Deleting all records from the ${model} table...`);
				result = await deleteAll(model);
				console.log(`Success: Deleted ${result.count} records.`);
				break;

			case "deleteOne":
				if (!id) {
					console.error("Error: ID is required for deleteOne operation.");
					process.exit(1);
				}

				console.log(`Deleting record with ID ${id} from the ${model} table...`);
				result = await deleteOne(model, id);
				console.log(`Success: Deleted record with ID ${id}.`);
				break;

			default:
				console.error(`Error: Unknown operation "${operation}".`);
				process.exit(1);
		}
	} catch (error) {
		console.error(`Operation ${operation} failed: `, error.message);
		process.exit(1);
	}
}

main();
