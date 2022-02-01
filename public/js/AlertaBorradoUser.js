const formBorrado = document.querySelector(".borrado")
const usuario = document.querySelector(".borrado").getAttribute("user")


   
formBorrado.addEventListener("submit", (e) => {
    e.preventDefault()
    Swal.fire({
        title: `Estas seguro ${usuario}?`,
        text: "No podes revertir el BORRADO!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, BORRAR!'       
      }).then((result) => {
        if (result.isConfirmed) {     
          Swal.fire(
            'Borrado!',
            `El usuario ${usuario} se borro de la base.`,
            'success'
          )
          formBorrado.submit()          
        } 
      })
    
});

