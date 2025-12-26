-- Import data for table: migrations
-- Generated from backup_insert.sql

INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('0', 'create-migrations-table', 'e18db593bcde2aca2a408c4d1100f6abba2195df', '2025-12-11 12:26:33.175292');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('1', 'initialmigration', '6ab16121fbaa08bbd11b712d05f358f9b555d777', '2025-12-11 12:26:33.246854');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('2', 'storage-schema', '5c7968fd083fcea04050c1b7f6253c9771b99011', '2025-12-11 12:26:33.30278');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('3', 'pathtoken-column', '2cb1b0004b817b29d5b0a971af16bafeede4b70d', '2025-12-11 12:26:33.404114');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('4', 'add-migrations-rls', '427c5b63fe1c5937495d9c635c263ee7a5905058', '2025-12-11 12:26:33.529737');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('5', 'add-size-functions', '79e081a1455b63666c1294a440f8ad4b1e6a7f84', '2025-12-11 12:26:33.559762');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('6', 'change-column-name-in-get-size', 'f93f62afdf6613ee5e7e815b30d02dc990201044', '2025-12-11 12:26:33.579812');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('7', 'add-rls-to-buckets', 'e7e7f86adbc51049f341dfe8d30256c1abca17aa', '2025-12-11 12:26:33.596049');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('8', 'add-public-to-buckets', 'fd670db39ed65f9d08b01db09d6202503ca2bab3', '2025-12-11 12:26:33.615533');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('9', 'fix-search-function', '3a0af29f42e35a4d101c259ed955b67e1bee6825', '2025-12-11 12:26:33.626801');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('10', 'search-files-search-function', '68dc14822daad0ffac3746a502234f486182ef6e', '2025-12-11 12:26:33.646707');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('11', 'add-trigger-to-auto-update-updated_at-column', '7425bdb14366d1739fa8a18c83100636d74dcaa2', '2025-12-11 12:26:33.66817');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('12', 'add-automatic-avif-detection-flag', '8e92e1266eb29518b6a4c5313ab8f29dd0d08df9', '2025-12-11 12:26:33.698798');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('13', 'add-bucket-custom-limits', 'cce962054138135cd9a8c4bcd531598684b25e7d', '2025-12-11 12:26:33.708157');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('14', 'use-bytes-for-max-size', '941c41b346f9802b411f06f30e972ad4744dad27', '2025-12-11 12:26:33.728924');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('15', 'add-can-insert-object-function', '934146bc38ead475f4ef4b555c524ee5d66799e5', '2025-12-11 12:26:33.910733');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('16', 'add-version', '76debf38d3fd07dcfc747ca49096457d95b1221b', '2025-12-11 12:26:33.932541');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('17', 'drop-owner-foreign-key', 'f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101', '2025-12-11 12:26:33.959654');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('18', 'add_owner_id_column_deprecate_owner', 'e7a511b379110b08e2f214be852c35414749fe66', '2025-12-11 12:26:33.989165');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('19', 'alter-default-value-objects-id', '02e5e22a78626187e00d173dc45f58fa66a4f043', '2025-12-11 12:26:34.029305');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('20', 'list-objects-with-delimiter', 'cd694ae708e51ba82bf012bba00caf4f3b6393b7', '2025-12-11 12:26:34.056847');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('21', 's3-multipart-uploads', '8c804d4a566c40cd1e4cc5b3725a664a9303657f', '2025-12-11 12:26:34.088833');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('22', 's3-multipart-uploads-big-ints', '9737dc258d2397953c9953d9b86920b8be0cdb73', '2025-12-11 12:26:34.221755');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('23', 'optimize-search-function', '9d7e604cddc4b56a5422dc68c9313f4a1b6f132c', '2025-12-11 12:26:34.349808');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('24', 'operation-function', '8312e37c2bf9e76bbe841aa5fda889206d2bf8aa', '2025-12-11 12:26:34.380289');
INSERT INTO storage.migrations (id, name, hash, executed_at) VALUES ('25', 'custom-metadata', '67eb93b7e8d401cafcdc97f9ac779e71a79bfe03', '2025-12-11 12:26:34.408749');
INSERT INTO supabase_functions.migrations (version, inserted_at) VALUES ('initial', '2025-12-11 12:25:28.043348+00');
INSERT INTO supabase_functions.migrations (version, inserted_at) VALUES ('20210809183423_update_grants', '2025-12-11 12:25:28.043348+00');
