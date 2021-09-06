<template>
  <v-data-table :headers="headers" :items="$store.state.usuarios.lista">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Usuarios</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> Nuevo usuario </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <!-- <span class="text-h5">{{ formTitle }}</span> -->
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.apellido" label="Apellido"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Correo"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.edad" label="Edad"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4"> </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
              <v-btn color="blue darken-1" text @click="addUsuario"> Guardar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Estás seguro que deseas eliminar este item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Eliminar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
<!--       <v-btn icon @click="editItem(item)"> <v-icon>mdi-pencil</v-icon></v-btn>
      <v-btn icon @click="deleteItem(item)"> <v-icon>mdi-delete </v-icon></v-btn> -->
            <v-btn icon @click=""> <v-icon>mdi-pencil</v-icon></v-btn>
      <v-btn icon @click=""> <v-icon>mdi-delete </v-icon></v-btn>
    </template>
  </v-data-table>
</template>

<script>



import axios from "axios";
export default {
  name: 'TablaDeUsuarios',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Nombre', sortable: false, value: 'nombre' },
      { text: 'Apellido', sortable: false, value: 'apellido' },
      { text: 'Correo', sortable: false, value: 'email' },
      { text: 'Edad', sortable: false, value: 'edad' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      nombre: '',
      apellido: '',
      email: '',
      edad: '',
    },
  }),
  computed: {
/*     formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
    }, */
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      return this.$store.state.usuarios.lista;
    },
      addUsuario() {
      let usuario = {
        nombre: this.editedItem.nombre,
        apellido: this.editedItem.apellido,
        email: this.editedItem.email,
        edad: this.editedItem.edad,
      };
      /* this.loading = true; */
      axios
        .post("http://localhost:3001/api/usuarios", usuario)
        this.$store.dispatch("SET_LIST");
        this.close()
/*        .then((accept) => {
          this.loading = false;
          
        }); */
    },
    
    editItem(item) {
      this.editedIndex = this.$store.state.usuarios.lista.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

      deleteItem (item) {
        //this.editedIndex = this.$store.state.usuarios.lista.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

    deleteItemConfirm() {
      this.$store.state.usuarios.lista.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.$store.state.usuarios.lista[this.editedIndex], this.editedItem)
      } else {
        this.$store.state.usuarios.list(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style></style>
