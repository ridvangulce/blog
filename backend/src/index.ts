import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      // Public rolünü bul
      const publicRole = await strapi
        .plugin('users-permissions')
        .service('role')
        .findOne({ type: 'public' });

      if (publicRole) {
        // Mevcut izinleri al
        const permissions = { ...publicRole.permissions };

        // Post api izinlerini ekle
        permissions['api::post'] = {
          controllers: {
            post: {
              find: { enabled: true },
              findOne: { enabled: true },
            },
          },
        };

        // Rolü güncelle
        await strapi
          .plugin('users-permissions')
          .service('role')
          .updateRole(publicRole.id, { permissions });

        strapi.log.info('Public role permissions updated for Post API');
      }
    } catch (error) {
      strapi.log.error('Bootstrap error updating permissions:', error);
    }
  },
};
