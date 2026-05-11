import { NextResponse } from "next/server";
import db from "@/app/shared/prisma/lib/db";
import { cloudinary } from "@/lib/cloudinary";

export async function GET() {
  try {
    const vehicles = await db.vehicle.findMany();
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    const formData = await request.formData();

    const imageFile = formData.get("image");
    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
      const imageBuffer = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      const dataURI = `data:${imageFile.type};base64,${base64Image}`;

      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: "vehicles",
        resource_type: "auto",
      });

      imageUrl = uploadResponse.secure_url;
    }
    const vehicle = await db.vehicle.create({
      data: {
        name: formData.get("name"),
        type: formData.get("type"),
        description: formData.get("description"),
        basePrice: parseFloat(formData.get("basePrice")),
        priceCoefficient: parseFloat(formData.get("priceCoefficient")),
        width: parseFloat(formData.get("width")),
        length: parseFloat(formData.get("length")),
        height: parseFloat(formData.get("height")),
        volume: parseFloat(formData.get("volume")),
        image: imageUrl,
      },
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return NextResponse.json(
      { error: "Failed to create vehicle" },
      { status: 500 }
    );
  }
}
export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    const data = {
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),
      basePrice: parseFloat(formData.get("basePrice")),
      priceCoefficient: parseFloat(formData.get("priceCoefficient")),
      length: parseFloat(formData.get("length")),
      width: parseFloat(formData.get("width")),
      height: parseFloat(formData.get("height")),
      volume: parseFloat(formData.get("volume")),
    };

    const imageFile = formData.get("image");

    if (imageFile && imageFile.size > 0) {
      const oldVehicle = await db.vehicle.findUnique({ where: { id } });

      if (oldVehicle?.image) {
        try {
          const urlParts = oldVehicle.image.split("/");
          const fileName = urlParts[urlParts.length - 1];
          const publicId = fileName.split(".")[0];
          const fullPublicId = `vehicles/${publicId}`;

          await cloudinary.uploader.destroy(fullPublicId);
        } catch (error) {
          console.error("Error deleting old image from Cloudinary:", error);
        }
      }
      const imageBuffer = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      const dataURI = `data:${imageFile.type};base64,${base64Image}`;

      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        folder: "vehicles",
        resource_type: "auto",
      });

      data.image = uploadResponse.secure_url;
    }

    const updatedVehicle = await db.vehicle.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedVehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return NextResponse.json(
      { error: "Failed to update vehicle" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    const vehicle = await db.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }
    if (vehicle.image) {
      try {
        const urlParts = vehicle.image.split("/");
        const fileName = urlParts[urlParts.length - 1];
        const publicId = fileName.split(".")[0];
        const fullPublicId = `vehicles/${publicId}`;

        await cloudinary.uploader.destroy(fullPublicId);
      } catch (cloudinaryError) {
        console.error("Error deleting image from Cloudinary:", cloudinaryError);
      }
    }
    await db.vehicle.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return NextResponse.json(
      { error: "Failed to delete vehicle" },
      { status: 500 }
    );
  }
}
