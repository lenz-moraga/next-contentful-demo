import { Router } from "express";
import * as service from "../services/projectService.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const response = await service.listProjects();

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single project by ID
router.get(
  "/:id",
  authenticate,
  authorize(["Admin", "editor"]),
  async (req, res) => {
    const { id } = req.params;
    try {
      const response = await service.getProject(id);
      console.log("response", response);
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Create a new project
router.post(
  "/",
  authenticate,
  authorize(["admin", "editor"]),
  async (req, res) => {
    try {
      const { name, description } = req.body;
      const response = await service.addProject(name, description);

      res.status(201).json(response[0]);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Update a project by ID
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "editor"]),
  async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
      const response = await service.editProject(id, name, description);

      res.status(200).json(response[0]);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Delete a project by ID
router.delete("/:id", authenticate, authorize(["admin"]), async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await service.removeProject(id);

    if (!deleted) return res.status(404).json({ error: "Project not found" });

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
