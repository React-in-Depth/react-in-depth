import { http, delay, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

import { v4 as uuid } from "uuid";

function delayedResponse(res) {
  return delay(300).then(res);
}

const CACHE_KEY = "100-things-msw-plain";
const store = JSON.parse(localStorage.getItem(CACHE_KEY)) || {
  things: [],
  isAuthorized: false,
};
function updateStore(newStore) {
  Object.assign(store, newStore);
  localStorage.setItem(CACHE_KEY, JSON.stringify(store));
}

function missingAuth() {
  if (!store.isAuthorized) {
    return delayedResponse(
      () => new HttpResponse("Unauthorized", { status: 403 })
    );
  }
}

export const worker = setupWorker(
  // - AUTHORIZATION NOT REQUIRED -

  // LOGIN
  http.post("/api/session", () => {
    updateStore({ isAuthorized: true });
    return delayedResponse(() =>
      HttpResponse.json({ status: "SESSION_CREATED" })
    );
  }),
  // LOGOUT
  http.delete("/api/session", () => {
    updateStore({ isAuthorized: false });
    return delayedResponse(() =>
      HttpResponse.json({ status: "SESSION_DELETED" })
    );
  }),
  // SIGNUP
  http.post("/api/user", () => {
    updateStore({ isAuthorized: true });
    return delayedResponse(() =>
      HttpResponse.json({ status: "USER_CREATED" })
    );
  }),

  // - AUTHORIZATION REQUIRED -
  // GET USER
  http.get("/api/user", () => {
    const invalid = missingAuth();
    if (invalid) {
      return invalid;
    }
    return delayedResponse(() =>
      HttpResponse.json({ status: "USER_EXISTS" })
    );
  }),
  // GET ALL THINGS
  http.get("/api/things", () => {
    const invalid = missingAuth();
    if (invalid) {
      return invalid;
    }
    const minimalThings = store.things.map(({ id, name, done }) => ({
      id,
      name,
      count: done.length,
    }));
    return delayedResponse(() => HttpResponse.json(minimalThings));
  }),
  // GET SINGLE THING
  http.get("/api/things/:tid", ({ params: { tid } }) => {
    const invalid = missingAuth();
    if (invalid) {
      return invalid;
    }
    const thing = store.things.find(({ id }) => id === tid);
    return delayedResponse(() => HttpResponse.json(thing));
  }),
  // DELETE THING
  http.delete("/api/things/:tid", ({ params: { tid } }) => {
    const invalid = missingAuth();
    if (invalid) {
      return invalid;
    }
    const things = store.things.filter(({ id }) => id !== tid);
    updateStore({ things });
    return delayedResponse(() =>
      HttpResponse.json({ status: "THING_DELETED" })
    );
  }),
  // ADD A THING
  http.post("/api/things", async ({ request }) => {
    const invalid = missingAuth();
    if (invalid) {
      return invalid;
    }
    const { name, description } = await request.json();
    const things = store.things.concat([
      { id: uuid(), done: [], name, description },
    ]);
    updateStore({ things });
    return delayedResponse(() =>
      HttpResponse.json({ status: "THING_CREATED" })
    );
  }),
  // DELETE LAST DONE FOR THING
  http.delete("/api/things/:tid/done/last", ({ params: { tid } }) => {
    const invalid = missingAuth();
    if (invalid) {
      return invalid;
    }
    const things = store.things.map((thing) =>
      thing.id === tid
        ? {
            ...thing,
            done: thing.done.slice(0, -1),
          }
        : thing
    );
    updateStore({ things });
    return delayedResponse(() =>
      HttpResponse.json({ status: "DONE_DELETED" })
    );
  }),
  // DELETE DONE FOR THING
  http.delete(
    "/api/things/:tid/done/:did",
    ({ params: { tid, did } }) => {
      const invalid = missingAuth();
      if (invalid) {
        return invalid;
      }
      const things = store.things.map((thing) =>
        thing.id === tid
          ? {
              ...thing,
              done: thing.done.filter(({ id }) => id !== did),
            }
          : thing
      );
      updateStore({ things });
      return delayedResponse(() =>
        HttpResponse.json({ status: "DONE_DELETED" })
      );
    }
  ),
  // DO A THING (ADD A DONE)
  http.post("/api/things/:tid/done", ({ params: { tid } }) => {
    const invalid = missingAuth();
    if (invalid) {
      return invalid;
    }
    const things = store.things.map((thing) =>
      thing.id === tid
        ? {
            ...thing,
            done: thing.done.concat({
              id: uuid(),
              time: new Date().getTime(),
            }),
          }
        : thing
    );
    updateStore({ things });
    return delayedResponse(() =>
      HttpResponse.json({ status: "DONE_CREATED" })
    );
  })
);
