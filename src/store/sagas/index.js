import routesSaga from "./routes.sagas";

const sagas = [
    routesSaga
];

const registerSagas = (middleware) => sagas.forEach((saga) => middleware.run(saga));

export default registerSagas;
