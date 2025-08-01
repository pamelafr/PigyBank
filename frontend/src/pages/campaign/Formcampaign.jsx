/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";

const BACK_URL = import.meta.env.VITE_BACK_URL;

export default function NovaCampanha() {
  const [showToast, setShowToast] = useState(false);

  // Form fields
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignLocation, setCampaignLocation] = useState("");
  const [fundraisingGoal, setFundraisingGoal] = useState("");
  const [description, setDescription] = useState("");
  const [pixKey, setPixKey] = useState("");

  const [imageType, setImageType] = useState("upload");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();
  const entityId = JSON.parse(localStorage.getItem("EntityData")).id_usuario;

  const resetForm = () => {
    setCampaignTitle("");
    setCampaignLocation("");
    setFundraisingGoal("");
    setDescription("");
    setPixKey("");
    setImageType("upload");
    setImagePreview(null);
    setImageFile(null);
    setImageUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCamp = {
      title: campaignTitle,
      goal: fundraisingGoal,
      received: 0,
      description: description,
      idOwner: entityId,
    };

    try {
      const route = `${BACK_URL}/campanhas/create`;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(route, newCamp, config);
      setShowToast(true); // Exibe Toast
      resetForm();
    } catch (err) {
      console.warn(`Erro ao cadastrar campanha: ${err}`);
    }
  };

  const handleImageUploadChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setImagePreview(url);
  };

  return (
    <div className="nova-campanha-page">
      <ToastContainer position="top-center" className="mt-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={4000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Sucesso</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            🎉 Campanha criada com sucesso!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <div
        id="pb"
        className="mt-5 container d-flex flex-column align-items-center justify-content-center"
      >
        <div className="form-header text-center">
          <h2 className="fw-bold">Divulgue sua Campanha</h2>
          <p className="text">Compartilhe sua causa conosco</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Título da campanha:</label>
              <input
                type="text"
                name="titulo"
                className="form-control"
                placeholder="Ex: Projeto de doações"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Local:</label>
              <input
                type="text"
                name="local"
                className="form-control"
                placeholder="Cidade / Estado"
                value={campaignLocation}
                onChange={(e) => setCampaignLocation(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Meta de arrecadação (R$):</label>
              <input
                type="number"
                name="meta"
                className="form-control"
                placeholder="Ex: 1000"
                value={fundraisingGoal}
                onChange={(e) => setFundraisingGoal(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição:</label>
              <textarea
                name="descricao"
                rows="4"
                className="form-control"
                placeholder="Conte mais sobre sua campanha"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Imagem: </label>
              <div
                className="btn-group mb-2"
                role="group"
                aria-label="Tipo de imagem"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="imagemTipo"
                  id="uploadRadio"
                  autoComplete="off"
                  checked={imageType === "upload"}
                  onChange={() => {
                    setImageType("upload");
                    setImagePreview(null);
                    setImageUrl("");
                  }}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor="uploadRadio"
                >
                  Upload
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="imagemTipo"
                  id="urlRadio"
                  autoComplete="off"
                  checked={imageType === "url"}
                  onChange={() => {
                    setImageType("url");
                    setImagePreview(null);
                    setImageFile(null);
                  }}
                />
                <label className="btn btn-outline-primary" htmlFor="urlRadio">
                  URL
                </label>
              </div>

              {imageType === "upload" ? (
                <input
                  type="file"
                  name="imagemUpload"
                  accept="image/*"
                  className="form-control"
                  onChange={handleImageUploadChange}
                />
              ) : (
                <input
                  type="url"
                  name="imagemUrl"
                  className="form-control"
                  placeholder="Cole o link da imagem"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                />
              )}

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-preview mt-2"
                />
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Qual sua chave PIX?</label>
              <input
                type="text"
                name="pix"
                className="form-control"
                placeholder="Digite sua chave PIX"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn-login w-100 rounded p-2 shadow"
              >
                Publicar Campanha
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
