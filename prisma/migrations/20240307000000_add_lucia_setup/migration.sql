-- CreateTable
CREATE TABLE "lucia_user"
(
    "id"       TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "lucia_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lucia_session"
(
    "id"        TEXT         NOT NULL,
    "userId"    TEXT         NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lucia_session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lucia_user_username_key" ON "lucia_user" ("username");
