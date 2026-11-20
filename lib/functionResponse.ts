/**
 * Reads a Cloud Function response body. Functions answer JSON on success but
 * some error paths send plain text (e.g. `res.status(400).send("…")`), which
 * would make `response.json()` throw and hide the real message.
 */
export async function readFunctionResponse(
  response: Response,
): Promise<{ error?: string } & Record<string, unknown>> {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: text || undefined };
  }
}
