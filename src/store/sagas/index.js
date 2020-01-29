import appSaga from "./app.sagas";

const sagas = [
    appSaga
];

const registerSagas = (middleware) => sagas.forEach((saga) => middleware.run(saga));

export default registerSagas;
