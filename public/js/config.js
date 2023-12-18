turnConfig = {
    iceServers: [
      {
        urls: ["stun:bn-turn1.xirsys.com"]
      },
      {
        username: "nlQ7wRlAh6Ns5bIi5q0fB5fbMrkdrmDGCBWijGR0IbR0D4AD5zx08GMOPXl_pGAAAAAGOIsD1QZXJreUxpb25ESg==",
        credential: "93c5e154-717e-11ed-b88f-0242ac140004",
        urls: [
          "turn:bnturn1.xirsys.com:80?transport=udp",
          "turn:bnturn1.xirsys.com:3478?transport=udp",
          "turn:bnturn1.xirsys.com:80?transport=tcp",
          "turn:bnturn1.xirsys.com:3478?transport=tcp",
          "turns:bnturn1.xirsys.com:443?transport=tcp",
          "turns:bnturn1.xirsys.com:5349?transport=tcp"
        ]
      }
    ]
  };
  