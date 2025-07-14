import { AccessToken } from 'livekit-server-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { identity, room } = req.body;

  if (!identity || !room) {
    return res.status(400).json({ error: 'Missing identity or room' });
  }

  try {
    const apiKey = 'APIKP4EZr8s4uhr';
    const apiSecret = 'oBE4q2eXF4JkjYlfRc27eDh9VdLwF1eFOfC1iaMdRfnO';

    const at = new AccessToken(apiKey, apiSecret, {
      identity,
      ttl: 3600,
    });

    at.addGrant({ roomJoin: true, room });

    const token = await at.toJwt(); // <- this may be async depending on lib version
    return res.status(200).send(token);
  } catch (error) {
    console.error("Token generation failed:", error);
    return res.status(500).send("TOKEN_SERVER_FAILURE");
  }
}
