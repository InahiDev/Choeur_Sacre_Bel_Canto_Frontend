<template>
  <main class="admin">
    <AdminConcert/>
    <AdminPiece/>
    <AdminPlace/>
    <AdminFile/>
    <AdminMember/>    
  </main>
</template>

<script>
import AdminFile from "@/components/AdminFile.vue"
import AdminConcert from "@/components/AdminConcert.vue"
import AdminPlace from "@/components/AdminPlace.vue"
import AdminMember from '@/components/AdminMember.vue'
import AdminPiece from '@/components/AdminPiece.vue'

export default {
  name: "AdminView",
  data () {
    return {

    }
  },
  computed: {
    
  },
  components: {
    AdminFile,
    AdminConcert,
    AdminPlace,
    AdminMember,
    AdminPiece
  },
  methods: {

  },
}
</script>

<style lang="scss">
.admin {
  .fa-circle-xmark {
    color: #F00;
  }

  .fa-circle-plus {
    color: $color-quarternary;
  }

  .fa-circle-minus {
    color: $color-quarternary;
  }

  input[type="submit"] {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 5px 15px;
    font-size: 1em;
    background-color: $color-secondary;
    color: #FFF;
    border: 1px solid transparent;
    border-radius: 15px / 50%;
  }
}

.unit {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 12px / 50%;
  box-shadow: $shadow-controls;
  position: relative;
  @include row;

  &__infos {
    width: 100%;
    position: relative;
    box-sizing: border-box;

    &__text {
      width: 100%;
      box-sizing: border-box;
      @include row;
      gap: 5px;

      &__unit {
        width: 100%;
        flex-wrap: nowrap;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .tooltip {
          visibility: hidden;
          width: auto;
          padding: 6px;
          border-radius: 14px;
          text-align: center;
          background-color: $color-secondary;
          color: #FFF;
          position: absolute;
          z-index: 3;
          top: -28px;
          left: 0;
        }

        &:hover .tooltip {
          visibility: visible;
        }
      }


    }

    &__controls {
      position: absolute;
      @include row(space-between);
      font-size: 1.2em;
    }
  }
}

.modify__menu {
  position: absolute;
  background-color: #FFF;
  @include column;
  gap: 5px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: $radius-controls;
  box-shadow: $shadow-controls;
  z-index: 2;
  width: 100%;

  &__text {
    @include column;
    gap: 5px;
    width: 100%;
    box-sizing: border-box;

    .formUnit {
      &--modify {
        width: 100%;
        @include row(space-between);

        input, select {
          flex: 2 1 140px;
          box-sizing: border-box;
        }

        select {
          text-align: center;
        }
      }
    }
  }
}
</style>