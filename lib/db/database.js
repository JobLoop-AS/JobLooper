import { prisma } from "./prisma.js";

// DatabaseError er en klasse som bygger på Error klassen fra javascript

export class DatabaseError extends Error {
	constructor(operation, model, error) {
		super(`${operation} operation failed for ${model}: ${error.message}`);
		this.name = "DatabaseError";
		this.originalError = error;
	}
}

/**
 * create - er en funksjon man kan kalle for å legge data inn i databasen.
 *
 * @param {string} model - Er navnet på prisma modelen eks. BrregApiData, WebCrawlerData.
 * @param {Object} data - Innholdet på dataen som skall inn i database tabellen.
 * @param {Object} options Ekstra create options
 * @returns Data som blir lagt inn i databasen.
 */

export async function create(model, data, options = {}) {
	try {
		if (!prisma[model]) {
			throw new Error(`Invalid model: ${model}`);
		}

		const result = await prisma[model].create({
			data,
			...options,
		});

		return { success: true, data: result };
	} catch (error) {
		throw new DatabaseError("Create", model, error);
	}
}

/**
 * getAll - er en funksjon man kan kalle fra en frontend api rute for å hente data fra databasen
 *
 * @param {string} model - Er navnet på prisma modelen eks. BrregApiData, WebCrawlerData
 * @param {Object} options - Ekstra query options
 * @returns All data fra en database tabell. Bruker man model BrregApiData henter man all data fra denne tabellen.
 */

export async function getAll(model, options = {}) {
	try {
		if (!prisma[model]) {
			throw new Error(`Invalid model: ${model}`);
		}

		const result = await prisma[model].findMany(options);
		return { success: true, data: result };
	} catch (error) {
		throw new DatabaseError("GetAll", model, error);
	}
}

/**
 * getByID - er en funksjon man kan kalle fra en frontend api rute for å hente data fra databasen etter id.
 *
 * @param {string} model - Er navnet på prisma modelen eks. BrregApiData, WebCrawlerData
 * @param {string | number} id - Id fra en rad fra databasen f.eks nettside.no data har id 4.
 * @param {*} options - Ekstra query options
 * @returns Henter ut data fra en tabell(model) etter id.
 */

export async function getById(model, id, options = {}) {
	try {
		if (!prisma[model]) {
			throw new Error(`Invalid model: ${model}`);
		}

		const result = await prisma[model].findUnique({
			where: { id },
			...options,
		});

		if (!result) {
			throw new Error(`${model} with id ${id} not found.`);
		}

		return { success: true, data: result };
	} catch (error) {
		throw new DatabaseError("GetById", model, error);
	}
}

/**
 * findWhere - funksjon, denne er litt mer kompleks en de andre funksjonene, trenger å lese litt mer
 * om where database ops for og forstå hvordan man kan bruke denne, det er en funksjon som gjør at man
 * kan hente ut data fra databasen med custom verdier, man kan bruke den til og hente alle rekker fra en tabell,
 * hente en, to eller hvor mange man vil basert på where clause parameteret.
 *
 * @param {string} model - Er navnet på prisma modelen eks. BrregApiData, WebCrawlerData.
 * @param {Object} where - Where clause
 * @param {Object} options - Ekstra query options (include, select, orderBy, etc.)
 * @returns Data basert på where clause og eventuellt options.
 */

export async function findWhere(model, where, options = {}) {
	try {
		if (!prisma[model]) {
			throw new Error(`Invalid model: ${model}`);
		}

		const result = await prisma[model].findMany({
			where,
			...options,
		});

		return { success: true, data: result };
	} catch (error) {
		throw new DatabaseError("FindWhere", model, error);
	}
}

/**
 * deleteAll - Fjerner all data fra den modelen/tabellen som er blitt valgt. Brukes i flush.js.
 *
 * @param {string} model - Er navnet på prisma modelen eks. BrregApiData, WebCrawlerData.
 * @returns Status fra delete operation og hvor mange som har blitt slettet.
 */

export async function deleteAll(model) {
	try {
		if (!prisma[model]) {
			throw new Error(`Invalid model: ${model}`);
		}

		const result = await prisma[model].deleteMany({});
		return { success: true, count: result.count };
	} catch (error) {
		throw new DatabaseError("DeleteAll", model, error);
	}
}

/**
 * deleteOne - Fjerner en instans fra data modellen/tabellen, du velger id for den rekken som skal slettes. Brukes i flush.js
 *
 * @param {string} model - Er navnet på prisma modelen eks. BrregApiData, WebCrawlerData.
 * @param {number} id - Dette er id'en på den rekken som skal slettes fra data modellen/tabellen.
 * @returns
 */

export async function deleteOne(model, id) {
	try {
		if (!prisma[model]) {
			throw new Error(`Invalid model: ${model}`);
		}

		const result = await prisma[model].delete({
			where: {
				id: Number(id),
			},
		});
		return { success: true, data: result };
	} catch (error) {
		throw new DatabaseError("DeleteOne", model, error);
	}
}
