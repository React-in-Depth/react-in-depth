import { http, delay, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

import { v4 as uuid } from "uuid";

function delayedResponse(res) {
  return delay(300).then(res);
}

const CACHE_KEY = "100-things-msw-better-reactive";
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

const user = { id: 1 };

export const worker = setupWorker(
  // - AUTHORIZATION NOT REQUIRED -

  // LOGIN
  http.post("/api/session", () => {
    updateStore({ isAuthorized: true });
    return delayedResponse(() => HttpResponse.json(user));
  }),
  // LOGOUT
  http.delete("/api/session", () => {
    updateStore({ isAuthorized: false });
    return delayedResponse(() => HttpResponse.json({ user: null }));
  }),
  // SIGNUP
  http.post("/api/user", () => {
    updateStore({ isAuthorized: true });
    return delayedResponse(() => HttpResponse.json(user));
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
    const newThing = { id: uuid(), done: [], name, description };
    const things = store.things.concat([newThing]);
    const newMinimalThing = { id: newThing.id, name, count: 0 };
    updateStore({ things });
    return delayedResponse(() => HttpResponse.json(newMinimalThing));
  }),
  // DELETE LAST DONE FOR THING
  http.delete("/api/things/:tid/done/last", ({ params: { tid } }) => {
    const invalid = missingAuth();
    if (invalid) {
      return invalid;
    }
    let updatedThing;
    const things = store.things.map((thing) => {
      if (thing.id !== tid) return thing;
      updatedThing = { ...thing, done: thing.done.slice(0, -1) };
      return updatedThing;
    });
    updateStore({ things });
    return delayedResponse(() => HttpResponse.json(updatedThing));
  }),
  // DELETE DONE FOR THING
  http.delete(
    "/api/things/:tid/done/:did",
    ({ params: { tid, did } }) => {
      const invalid = missingAuth();
      if (invalid) {
        return invalid;
      }
      let updatedThing;
      const things = store.things.map((thing) => {
        if (thing.id !== tid) return thing;
        updatedThing = {
          ...thing,
          done: thing.done.filter(({ id }) => id !== did),
        };
        return updatedThing;
      });
      updateStore({ things });
      return delayedResponse(() => HttpResponse.json(updatedThing));
    }
  ),
  // DO A THING (ADD A DONE)
  http.post("/api/things/:tid/done", ({ params: { tid } }) => {
    const invalid = missingAuth();
    if (invalid) {
      return invalid;
    }
    let updatedThing = null;
    const things = store.things.map((thing) => {
      if (thing.id !== tid) return thing;
      updatedThing = {
        ...thing,
        done: thing.done.concat({
          id: uuid(),
          time: new Date().getTime(),
        }),
      };
      return updatedThing;
    });
    updateStore({ things });
    return delayedResponse(() => HttpResponse.json(updatedThing));
  })
);
