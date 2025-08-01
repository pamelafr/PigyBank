<?php

namespace App\Controllers;

// Controller que retorna apenas a imagem de perfil
// de um usuário para que o front o consuma


use CodeIgniter\RESTful\ResourceController;

class Image extends ResourceController {
    
    public function profile($fileName = null){

        $path = WRITEPATH . 'uploads/img/pfp/' . $fileName;

        if(!is_file($path)){
            return $this->failNotFound('Imagem não encontrada!');
        }

        // dps eu documento isso aí
        
        $fileInfo = new \finfo(FILEINFO_MIME_TYPE);
        $mimeType = $fileInfo->file($path);

        return $this->response
            ->setHeader('Content-Type', $mimeType)
            ->setBody(file_get_contents($path));
    }

    public function defaultProfilePicture($fileName = null){
        $path = base_url('img/default/' . $fileName);
        

        if(!is_file($path)){
            return $this->failNotFound('Imagem padrão não encontrada!');
        }

        $fileInfo = new \finfo(FILEINFO_MIME_TYPE);
        $mimeType = $fileInfo->file($path);

        return $this->response
            ->setHeader('Content-Type', $mimeType)
            ->setBody(file_get_contents($path));
    }
}