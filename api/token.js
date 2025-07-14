import { AccessToken } from 'livekit-server-sdk';

export default function handler(req, res) {
  const LIVEKIT_API_KEY = 'APIKP4EZr8s4uhr';
  const LIVEKIT_API_SECRET = 'oBE4q2eXF4JkjYlfRc27eDh9VdLwF1eFOfC1iaMdRfnO';

  const { identity, room } = req.body;

  if (!identity || !room) {
    return res.status(400).send("Missing identity or room");
  }

  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity,
  });
  at.addGrant({ roomJoin: true, room });

  const token = at.toJwt();
  res.send(token);
}
