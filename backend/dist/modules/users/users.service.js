import { rolePermissions, usersMock } from "./users.mock.js";
const now = () => new Date().toISOString();
const nextId = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
export async function listUsers(role) {
    const users = role ? usersMock.filter((user) => user.role === role) : usersMock;
    return structuredClone(users);
}
export async function createUser(input) {
    const user = {
        id: nextId("usr"),
        name: input.name,
        email: input.email,
        phone: input.phone,
        role: input.role,
        isActive: true,
        stationCode: input.stationCode,
        permissions: input.permissions ?? rolePermissions[input.role],
        createdAt: now()
    };
    usersMock.unshift(user);
    return structuredClone(user);
}
export async function updateUserPermissions(userId, input) {
    const user = usersMock.find((candidate) => candidate.id === userId);
    if (!user)
        return null;
    user.permissions = input.permissions;
    return structuredClone(user);
}
