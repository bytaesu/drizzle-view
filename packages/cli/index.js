const { ensureBinary } = require("./drizzle-view");

/**
 * Drizzle View CLI - Main entry point
 */
module.exports = {
  /**
   * Downloads and ensures the platform-specific Drizzle View binary is available
   * @returns {Promise<string>} Path to the binary
   */
  ensureBinary,
};
