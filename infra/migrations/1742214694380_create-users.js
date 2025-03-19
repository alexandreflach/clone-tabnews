exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    //for reference, GitHub limits usernames to 39 characters
    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },
    //why 254? https://stackoverflow.com/a/1199238
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },
    //why 72 set length? https://security.stackexchange.com/a/39851
    password: {
      type: "varchar(72)",
      notNull: true,
    },
    //why timestamp with timezone? https://justatheory.com/2012/04/postgres-use-timestamptz/
    created_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },
    update_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },
  });
};

exports.down = (pgm) => {};
