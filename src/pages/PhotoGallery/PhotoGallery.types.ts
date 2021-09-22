import { Photos } from "../../types/common";

export type PageRef = Omit<Photos, "photo"> & { isLoading: boolean };
