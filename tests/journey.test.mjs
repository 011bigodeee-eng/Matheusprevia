import test from "node:test";
import { URL } from "node:url";
import assert from "node:assert/strict";
import { goals, journeyMessage, whatsappUrl } from "../src/config/journey.ts";
test("every goal has a distinct set of supported challenges", () => {
  assert.equal(goals.length, 4);
  for (const goal of goals) assert.equal(goal.challenges.length, 4);
  assert.equal(goals[3].challenges[0], "Começo e paro frequentemente");
});
test("WhatsApp includes all answers with accents safely encoded", () => {
  const answers = {
    goal: 3,
    challenge: "Minha rotina é muito corrida",
    days: "3 dias",
    modality: "Consultoria online",
  };
  const message = journeyMessage(answers);
  const url = new URL(whatsappUrl("+55 (11) 99999-9999", message));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/5511999999999");
  assert.equal(url.searchParams.get("text"), message);
  for (const expected of [
    "Criar constância",
    answers.challenge,
    answers.days,
    answers.modality,
  ])
    assert.ok(message.includes(expected));
});
test("missing or invalid contacts never create a WhatsApp link", () => {
  assert.equal(whatsappUrl("", "Mensagem"), null);
  assert.equal(whatsappUrl("A CONFIGURAR", "Mensagem"), null);
  assert.equal(whatsappUrl("123", "Mensagem"), null);
});
